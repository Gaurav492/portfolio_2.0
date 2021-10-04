const container = document.querySelector('#blog-grid')
const yearSpan = document.querySelector('.year span')

async function gql(query, variables = {}) {
    const data = await fetch('https://api.hashnode.com/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query,
            variables
        })
    });

    return data.json();
}

const GET_USER_ARTICLES = `
    query GetUserArticles($page: Int!) {
        user(username: "gauravvala444") {
            publication {
                posts(page: $page) {
                    title
                    brief
                    coverImage
                    slug
                }
            }
        }
    }
`;

let blogFormate = '';

gql(GET_USER_ARTICLES, { page: 0 })
    .then(result => {
        const articles = result.data.user.publication.posts;
        const blog_list = articles.slice(0, 4);

        blog_list.forEach(blog => {
            // console.log(blog);


            let single_blog = document.createElement('div');
            single_blog.className = "single-blog";
            let img = document.createElement('img');
            let title = document.createElement('h3');
            let brief = document.createElement('p');
            let link = document.createElement('a');
            link.className = "links";
            link.setAttribute("target", "_blank");
            link.setAttribute("rel", "noopener noreferrer");

            title.innerText = blog.title;
            brief.innerText = blog.brief;
            img.src = `${blog.coverImage}`;
            link.innerText = 'Read more...';
            link.href = `https://gauravvala.hashnode.dev/${blog.slug}`;

            single_blog.appendChild(img);
            single_blog.appendChild(title);
            single_blog.appendChild(brief);
            single_blog.appendChild(link);


            container.appendChild(single_blog)
        });

    });


let year = new Date();

yearSpan.innerHTML = `Copyright &copy;${year.getFullYear()}`;


