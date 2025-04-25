let proVids_posts = [];
let proVids_currentTag = "all";

function proVids_createPostHTML(post) {
    const mediaContent = post.videoUrl 
        ? `<iframe class="proVids_video" src="${post.videoUrl}" allow="autoplay" allowfullscreen></iframe>`
        : `<img class="proVids_image" src="${post.imageUrl}" alt="${post.title}">`;
    
    return `
        <div class="proVids_post" data-tags='${JSON.stringify(post.tags)}'>
            <h2>${post.title}</h2>
            <div class="proVids_content">
                <p>${post.text}</p>
                ${mediaContent}
            </div>
        </div>`;
}

function proVids_renderPosts() {
    const container = document.getElementById("proVids_posts-container");
    container.innerHTML = proVids_posts
        .filter(post => proVids_currentTag === "all" || post.tags.includes(proVids_currentTag))
        .map(proVids_createPostHTML)
        .join("");

    proVids_handleVideos();
}

function proVids_renderTags() {
    const tagSet = new Set();
    proVids_posts.forEach(post => post.tags.forEach(tag => tagSet.add(tag)));
    const tagGrid = document.getElementById("proVids_tag-filters");

    const allTags = ["all", ...Array.from(tagSet)];

    tagGrid.innerHTML = allTags
        .map(tag => `<button class="${tag === proVids_currentTag ? 'proVids_active' : ''}" data-tag="${tag}">${tag}</button>`)
        .join("");

    tagGrid.querySelectorAll("button").forEach(button =>
        button.addEventListener("click", () => {
            proVids_currentTag = button.getAttribute("data-tag");
            proVids_renderTags();
            proVids_renderPosts();
        })
    );
}

function proVids_handleVideos() {
    const iframes = document.querySelectorAll(".proVids_video");
    
    // Mobile: Pause all videos initially
    if (window.innerWidth <= 768) {
        iframes.forEach(iframe => {
            iframe.setAttribute('allow', '');
            iframe.contentWindow?.postMessage('{"event":"command","func":"pauseVideo","args":[]}', '*');
        });
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const iframe = entry.target;
            const command = entry.isIntersecting ? "playVideo" : "pauseVideo";
            // Only autoplay on desktop
            if (window.innerWidth > 768 || command === "pauseVideo") {
                iframe.contentWindow?.postMessage(`{"event":"command","func":"${command}","args":[]}`, '*');
            }
        });
    }, { 
        threshold: window.innerWidth <= 768 ? 0.1 : 0.6 
    });

    iframes.forEach(iframe => observer.observe(iframe));
}


fetch("data-projects.json")
    .then(res => res.json())
    .then(data => {
        proVids_posts = data;
        proVids_renderTags();
        proVids_renderPosts();
    });