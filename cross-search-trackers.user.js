// ==UserScript==
// @name         cross-search-trackers
// @version      0.2.2
// @description  cross search button with imdb links
// @author       falafel
// @namespace    https://github.com/lukacoufyl/cross-search-trackers
// @match        https://passthepopcorn.me/torrents.php*
// @match        https://www.torrentbd.com/torrents-details.php*
// @match        https://www.torrentbd.net/torrents-details.php*
// @grant        none
// ==/UserScript==

function getIMDbID(currSite) {
    if(currSite == "tbd"){
        const ratingBlockElement = document.querySelector(".inl-rating-block")
        let children = Array.from(ratingBlockElement.children);
        let child; // don't forget to declare this variable
        for(child in children){
            if(children[child].getAttribute("data-tooltip") == "IMDb Rating"){
                let imdbLink = children[child].childNodes[1].href
                if(imdbLink.endsWith("/")){
                    imdbLink = imdbLink.slice(0,-1)
                }
                const imdbID = imdbLink.split("/").pop()
                return imdbID
            }
        }
    }
    else if(currSite == "ptp"){
        const imdbElement = document.querySelector("#imdb-title-link")
        if (imdbElement){
            let imdbLink = imdbElement.href
            if(imdbLink.endsWith("/")){
                imdbLink = imdbLink.slice(0,-1)
            }
            const imdbID = imdbLink.split("/").pop()
            return imdbID
        }
    }
    return null
}

// main
// current site
const currURL = window.location.href
let currSite = null
if(currURL.includes("torrentbd")){
    currSite = "tbd"
}
else if(currURL.includes("passthepopcorn")){
    currSite = "ptp"
}
const imdbID = getIMDbID(currSite);
if(imdbID){
    let titleElement = null
    if(currSite == "tbd"){
        titleElement = $('div.inl-rating-block');
        //titleElement[0].innerHTML = '<p>"\n"</p><hr><p>"\n"</p>' + titleElement[0].innerHTML
    }
    else if(currSite == "ptp"){
        titleElement = $('div.linkbox');
    }
    let p = '<p>'
    // rarbg
    p = p + '<a target="_blank" class="rarbg-search-link" href="https://rarbgaccess.org/torrents.php?search=' + imdbID + '" rel="noreferrer"><img src="https://dyncdn.me/static/20/img/logo_dark_nodomain2_optimized.png" style="height:20px;width:54px;" title="RARBG"></a>'
    // hdt
    p = p + ' <a target="_blank" class="hdt-search-link" href="https://hd-torrents.org/torrents.php?search=' + imdbID + '" rel="noreferrer"><img src="https://hd-torrents.org/style/classicx/hdlogo.png" style="height:20px;width:92px;" title="HD-Torrents"></a>'
    // bhd
    p = p + ' <a target="_blank" class="bhd-search-link" href="https://beyond-hd.me/torrents?search=' + imdbID + '" rel="noreferrer"><img src="https://beyond-hd.me/img/mainsitelogo4.png" style="height:20px;width:124px;" title="BeyondHD"></a>'
    // blu
    p = p + ' <a target="_blank" class="blu-search-link" href="https://blutopia.xyz/torrents?imdbId=' + imdbID + '" rel="noreferrer"><img src="https://blutopia.xyz/favicon.ico" style="height:30px;width:30px;" title="Blutopia"></a>'
    // uhdb
    p = p + ' <a target="_blank" class="uhdb-search-link" href="https://uhdbits.org/torrents.php?searchstr=' + imdbID + '" rel="noreferrer"><img src="https://uhdbits.org/static/styles/navescent/images/logo.png" style="height:20px;width:45px;" title="UHDBits"></a>'
    // mtv
    p = p + ' <a target="_blank" class="mtv-search-link" href="https://www.morethantv.me/torrents/browse?searchtext=' + imdbID + '" rel="noreferrer"><img src="https://www.morethantv.me/favicon.ico" style="height:30px;width:30px;" title="MoreThanTV"></a>'
    // fl
    p = p + ' <a target="_blank" class="fl-search-link" href="https://filelist.io/browse.php?search=' + imdbID + '" rel="noreferrer"><img src="https://filelist.io/styles/images/logo_blue.png" style="height:30px;width:67px;" title="FileList"></a>'
    // tl
    p = p + ' <a target="_blank" class="tl-search-link" href="https://www.torrentleech.org/torrents/browse/index/query/' + imdbID + '" rel="noreferrer"><img src="https://www.torrentleech.org/images/Tl_logo-White.png" style="height:20px;width:74px;" title="TorrentLeech"></a>'
    p = p + '</p>'
    if(currSite == "tbd"){
        titleElement[0].outerHTML = '<div>' + p + '</div> <p></p> <hr> <p></p>' + titleElement[0].innerHTML
    }
    else{
        titleElement[0].innerHTML = p + titleElement[0].innerHTML
    }
}
