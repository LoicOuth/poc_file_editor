/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const FileController = () => import('#controllers/files_controller')

import router from '@adonisjs/core/services/router'
router.get('/', [FileController, 'render'])
router.post('/write', [FileController, 'write'])
