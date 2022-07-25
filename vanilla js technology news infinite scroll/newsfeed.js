const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '672f444ba1msh5ef96f3113280dep176206jsnb157cac756a8',
        'X-RapidAPI-Host': 'free-news.p.rapidapi.com'
    }
};

const newsFeed = document.getElementById('newsfeed');
let page = 1;

// fetch('https://free-news.p.rapidapi.com/v1/search?q=Technology&lang=en&page=1', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));

const fetchPage = async () => {
    try {
        let response = await fetch(`https://free-news.p.rapidapi.com/v1/search?q=Technology&lang=en&page=${page}`, options);
        let data = await response.json();
        return data.articles;
    } catch (error) {
        console.log(error);
    }
}

// fetch data once initially and load to page
fetchPage().then(data => {
    appendNews(data);
    page++;
});

const appendNews = (data) => {
    for (let news of data) {
        const p = document.createElement('p');
        p.classList.add('news-item');
        let summary = document.createTextNode(news.summary);
        p.appendChild(summary);
        newsFeed.appendChild(p);
    }
}

const handleScroll = () => {
    // const distanceToBottom = this.scrollHeight - this.scrollTop - this.clientHeight;
    // console.log(distanceToBottom);
    // console.log(newsFeed.scrollHeight)
    // console.log(newsFeed.scrollTop)
    // console.log(newsFeed.scrollHeight - newsFeed.scrollTop - newsFeed.clientHeight)
    const distanceToBottom = newsFeed.scrollHeight - newsFeed.scrollTop - newsFeed.clientHeight;

    if (distanceToBottom > 5) return;
    // fetch new data and append to newsfeed
    // fetch data once initially and load to page
    fetchPage().then(data => {
        appendNews(data);
        page++;
        console.log(page)
    });
}

// add a scroll event to newsFeed
newsFeed.addEventListener('scroll', handleScroll);

window.addEventListener('scroll', handleScroll)