const express = require('express')
const router = express.Router()
const Article = require('./../models/article')

router.get('/new', (req, res) =>{
    res.render('articles/new', {article: new Article()})
})

//GET ROUTE FOR FORM
router.get('/:slug', async (req, res) =>{
    const{slug} = req.params.slug
    const article = await Article.findOne({slug: req.params.slug})
    if(article == null) res.redirect('/')
    res.render('articles/show', {article})
})

//POST ROUTE FOR FORM SUBMIT
router.post('/', async (req, res) =>{
    let article = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
    })
    try{
        article = await article.save();
        res.redirect(`/articles/${article.slug}`)
    } catch (e){
        console.log(e)
       res.render('articles/new', {article})
    } 
})

//EDIT ROUTE
router.get('/edit/:id', async (req, res) =>{
    const article = await Article.findById(req.params.id)
    res.render('articles/edit', {article})

})

//PUT ROUTE FOR EDIT
router.put('/:slug', async (req, res) =>{
    const article = await Article.findByIdAndUpdate(req.params.slug, req.body, {runValidators:true, new:true})
    res.redirect(`/articles/${article.slug}`)

})

//DELETE ROUTE
router.delete('/:id', async (req, res) =>{
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
})



module.exports = router