import { type HttpContext } from '@adonisjs/core/http'
import { readFileSync, writeFileSync } from 'node:fs'

export default class FilesController {
  async render({ inertia }: HttpContext) {
    const content = readFileSync('./cs2_config.json')

    return inertia.render('home', {
      fileContent: content.toString('utf8'),
    })
  }

  async write({ request, response, session }: HttpContext) {
    writeFileSync('./cs2_config.json', request.all().content)

    session.flash('success', {
      type: 'success',
      message: 'Config save',
    })

    return response.redirect('/')
  }
}
