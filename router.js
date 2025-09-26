let express = require('express');
let userController = require('./controllers/userController');
let postController = require('./controllers/postController');
const router = express.Router();

router.get('/', userController.home);
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/create-post', userController.checkLogin, postController.viewCreatePost);
router.post('/create-post', userController.checkLogin, postController.createPost);
router.get('/post/:id', userController.checkLogin, postController.viewSinglePost);
router.get('/post/:id/edit', userController.checkLogin, postController.viewEditScreen);
router.post('/post/:id/edit', userController.checkLogin, postController.editPost);
router.post('/post/:id/delete', userController.checkLogin, postController.deletePost);
router.get('/profile/:username', userController.checkUserExists, userController.viewProfile);

module.exports = router;