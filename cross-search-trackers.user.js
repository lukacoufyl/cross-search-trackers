// ==UserScript==
// @name         cross-search-trackers
// @version      0.2
// @description  cross search button with imdb links
// @author       falafel
// @namespace    https://github.com/lukacoufyl/cross-search-trackers
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
    // blu
    p = p + ' <a target="_blank" class="blu-search-link" href="https://blutopia.xyz/torrents?imdbId=' + imdb_id + '" rel="noreferrer"><img src="https://blutopia.xyz/favicon.ico" style="height:30px;width:30px;" title="Blutopia"></a>'
    // mtv
    p = p + ' <a target="_blank" class="mtv-search-link" href="https://www.morethantv.me/torrents/browse?searchtext=' + imdb_id + '" rel="noreferrer"><img src="https://www.morethantv.me/favicon.ico" style="height:30px;width:30px;" title="MoreThanTV"></a>'
    // fl
    p = p + ' <a target="_blank" class="fl-search-link" href="https://filelist.io/browse.php?search=' + imdb_id + '" rel="noreferrer"><img src="https://filelist.io/styles/images/logo_blue.png" style="height:30px;width:67px;" title="FileList"></a>'
    p = p + '</p>'
    titleElement[0].innerHTML = p + titleElement[0].innerHTML
}
