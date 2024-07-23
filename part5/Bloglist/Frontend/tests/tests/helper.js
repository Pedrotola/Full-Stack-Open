const loginUser = async ( page, username, password ) => {
  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(password)
  await page.getByRole('button', { name:'login' }).click()
}

const newBlog = async ( page, title, author, url ) => {
  await page.getByRole('button', { name:'create a new blog' }).click()
  await page.getByTestId('blog-title').fill(title)
  await page.getByTestId('blog-author').fill(author)
  await page.getByTestId('blog-url').fill(url)
  await page.getByRole('button', { name:'create' }).click()
  await page.getByText(`${title} ${author}`).waitFor()
}

const likesBlog = async ( page, numLikes, title, author) => {
  const element = await page.getByText(`${title} ${author}`)
  await element.getByRole('button', { name:'view' }).click()
  for (let i = 0; i <= numLikes; i++) {
    await element.getByRole('button', { name:'like' }).click()
    await element.getByText(`likes ${i}`).waitFor()
  }
}

export { loginUser, newBlog, likesBlog }