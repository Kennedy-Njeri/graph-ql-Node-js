let users = [{

    id: '1',
    name: 'Kennedy',
    email: 'kennedy@example.com',
    age: 22
},
    {
        id: '2',
        name: 'richard',
        email: 'richard@example.com',

    },

    {
        id: '3',
        name: 'john',
        email: 'john@example.com',

    }]


let posts = [{
    id: '10',
    title: 'GraphQl 101',
    body: 'This is how to use GraphQl',
    published: true,
    author: '1'
},
    {
        id: '11',
        title: 'GraphQl 201',
        body: 'This is how to use GraphQl advanced',
        published: false,
        author: '1'
    },
    {
        id: '12',
        title: 'Typescript 301',
        body: 'This is how to use typescript',
        published: true,
        author: '2'
    }]


let comments = [
    {
        id: '102',
        text: 'This worked well',
        author: '3',
        post: '10'
    },
    {
        id: '103',
        text: 'That is cool',
        author: '1',
        post: '10'
    },
    {
        id: '104',
        text: 'This did not work',
        author: '2',
        post: '11'
    },
    {
        id: '105',
        text: 'I got it to work',
        author: '1',
        post: '11'
    }]

const db = {
    users,
    posts,
    comments
}


export { db as default }