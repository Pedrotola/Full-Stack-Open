const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginUser, newBlog, likesBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3001/api/testing/reset')
    await request.post('http://localhost:3001/api/users',{
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('Login to application')).toBeVisible()
    await expect(page.getByText('username')).toBeVisible()
    await expect(page.getByText('password')).toBeVisible()
    await expect(page.getByRole('button', { name:'login' } )).toBeVisible()
  })

  describe('Login', () => {
    test('succeds with correct credentials', async ({ page }) => {
      await loginUser(page, 'mluukkai', 'salainen', true)
      await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
    })

    test('fails with wrong credential', async ({ page }) => {
      await loginUser(page, 'mluukkai', 'wrong', true)
      const errorDiv = page.locator('.error')
      await expect(errorDiv).toContainText('wrong username or password')
      await expect(errorDiv).toHaveCSS('border-style', 'solid')
      await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginUser(page, 'mluukkai', 'salainen', true)
    })

    test('a new blog can be created', async ({ page }) => {
      await newBlog(page, 'My first Blog', 'Mr. Nobody', 'https://myfirtsblog.com/firstblog')
      await expect(page.getByText('You new blog My first Blog by Mr. Nobody added')).toBeVisible()
      await expect(page.getByText('My first Blog Mr. Nobody')).toBeVisible()
    })

    describe('When a created a blog', () => {
      beforeEach( async ({ page }) => {
        await newBlog(page, 'My first Blog', 'Mr. Nobody', 'https://myfirtsblog.com/firstblog')
      })

      test('a blog can be updated like', async ({ page }) => {
        await page.getByRole('button', { name: 'view' }).click()
        await page.getByRole('button', { name: 'like' }).click()
        await expect(page.getByText('likes 1')).toBeVisible()
      })

      test('a blog can be deleted with permisson users', async ({ page }) => {
        await page.getByRole('button', { name: 'view' }).click()
        page.on('dialog', async dialog => {
          expect(dialog.message()).toBe('Remove blog My first Blog by Mr. Nobody')
          await dialog.accept()
        })
        await page.getByRole('button', { name: 'remove' }).click()
        await expect(page.getByText('My first Blog Mr. Nobody')).not.toBeVisible()
      })

      describe('Blog check', () => {
        beforeEach( async ({ page, request }) => {
          await request.post('http://localhost:3001/api/users', {
            data: {
              name: 'Charles Oliveira',
              username: 'charlesoli',
              password: 'olicharles'
            }
          })
          await page.getByRole('button', { name:'logout' }).click()
          await loginUser(page, 'charlesoli', 'olicharles', true)
        })
        test('Only the creator is posible remove', async ({ page }) => {
          await page.getByRole('button', { name: 'view' }).click()
          await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
        })
      })
    })
  })

  describe('When multiple blogs are created', () => {
    beforeEach(async ({ page }) => {
      await loginUser(page, 'mluukkai', 'salainen', true)
      await newBlog(page, 'My first Blog', 'Mr. Nobody', 'https://myfirtsblog.com/firstblog')
      await likesBlog(page, 2, 'My first Blog', 'Mr. Nobody')
      await newBlog(page, 'My second Blog', 'Mr. Nobody', 'https://myfirtsblog.com/secondblog')
      await likesBlog(page, 5, 'My second Blog', 'Mr. Nobody')
      await newBlog(page, 'My third Blog', 'Mr. Nobody', 'https://myfirtsblog.com/thirdblog')
      await likesBlog(page, 4, 'My third Blog', 'Mr. Nobody')
    })

    test('Blogs are ordered by likes', async ({ page }) => {
      const blogTitles = await page.$$eval('.blog-title', titles => titles.map(title => title.textContent))
      const expectedOrder = ['My second Blog', 'My third Blog', 'My first Blog']
      expect(blogTitles).toEqual(expectedOrder)
    })
  })
})