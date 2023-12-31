const graphql = require('graphql');
//const _ = require('lodash');
const Book =  require('../model/book')
const Author =  require('../model/author');




const {GraphQLObjectType,GraphQLString,GraphQLID,GraphQLSchema,GraphQLInt,GraphQLList} = graphql




const BookType = new GraphQLObjectType({
    name:'Book',
    //function in field is for order of constant variable if we will not put then it will exe serially and through an error
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        genre:{type:GraphQLString},
        author:{
            type:AuthorType,
            resolve(parent,args){
                return Author.findById(parent.authorId)
                // return _.find(authors,{id:parent.authorid})
            }
        }
    })

})


const AuthorType = new GraphQLObjectType({
    name:'Author',
    //function in field is for order
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        age:{type:GraphQLInt},
        books:{
            type: new GraphQLList(BookType),
            resolve(parent,args){
                // return _.filter(books,{authorid:parent.id})
                return Book.find({authorId:parent._id})
            }
        }
    })

})


const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        book:{
            type:BookType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                //code to get from db / other source
                // return _.find(books,{id:args.id});
                return Book.findById(args.id)
            }
        },
        author:{
            type:AuthorType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                // return _.find(authors,{id:args.id});
                return Author.findById(args.id);
            }
        },
        books:{
            type: new GraphQLList(BookType),
            resolve(parent,args){
                return Book.find({})
            }
        },
        authors:{
            type: new GraphQLList(AuthorType),
            resolve(parent,args){
                return Author.find({})
            }
        }
    }
})



const Mutation = new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addAuthor:{
            type:AuthorType,
            args:{
                name:{type:GraphQLString},
                age:{type:GraphQLInt},
            },
            resolve(parent,args){
                let author = new Author({
                    name:args.name,
                    age:args.age
                })
              return  author.save();
            }
        },
        addBook:{
            type:BookType,
            args:{
                name:{type:GraphQLString},
                genre:{type:GraphQLString},
                authorId:{type:GraphQLID}
            }
            ,
            resolve(parent,args){
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                });
                return book.save()
            }
        }
    }
})


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation:Mutation
})