// ==UserScript==
// @name         cross-search-trackers
// @version      0.2
// @description  cross search button with imdb links
// @author       falafel
// @match        https://passthepopcorn.me/torrents.php*
// @grant        none
// ==/UserScript==

function getIMDbID() {
    const imdbElement = document.querySelector("#imdb-title-link")
    if (imdbElement){
        let imdbLink = imdbElement.href
        if(imdbLink.endsWith("/")){
            imdbLink = imdbLink.slice(0,-1)
        }
        const imdb_id = imdbLink.split("/").pop()
        return imdb_id
    }
    return null
}
const imdb_id = getIMDbID();
if(imdb_id){
    // let titleElement = $('h2.page__title');
    let titleElement = $('div.linkbox');
    let p = '<p>'
    // rarbg
    p = p + '<a target="_blank" class="rarbg-search-link" href="https://rarbgaccess.org/torrents.php?search=' + imdb_id + '" rel="noreferrer"><img src="https://dyncdn.me/static/20/img/logo_dark_nodomain2_optimized.png" style="height:20px;width:54px;" title="RARBG"></a>'
    // hdt
    p = p + ' <a target="_blank" class="hdt-search-link" href="https://hd-torrents.org/torrents.php?search=' + imdb_id + '" rel="noreferrer"><img src="https://hd-torrents.org/style/classicx/hdlogo.png" style="height:20px;width:92px;" title="HD-Torrents"></a>'
    // bhd
    p = p + ' <a target="_blank" class="bhd-search-link" href="https://beyond-hd.me/torrents?search=' + imdb_id + '" rel="noreferrer"><img src="https://beyond-hd.me/img/mainsitelogo4.png" style="height:20px;width:124px;" title="BeyondHD"></a>'
    p = p + '</p>'
    titleElement[0].innerHTML = p + titleElement[0].innerHTML
}