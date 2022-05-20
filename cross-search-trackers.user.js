// ==UserScript==
// @name         cross-search-trackers
// @namespace    https://lukacoufyl.github.io/cross-search-trackers/
// @version      0.2.3
// @description  cross search button with imdb links
// @author       falafel
// @updateURL    https://lukacoufyl.github.io/cross-search-trackers/cross-search-trackers.user.js
// @downloadURL  https://lukacoufyl.github.io/cross-search-trackers/cross-search-trackers.user.js
// @match        https://passthepopcorn.me/torrents.php*
// @match        https://www.torrentbd.com/*
// @match        https://www.torrentbd.net/*
// @match        https://www.torrentbd.me/*
// @match        https://hd-torrents.org/details.php*
// @match        https://hd-torrents.net/details.php*
// @match        https://hd-torrents.me/details.php*
// @match        https://hdts.ru/details.php*
// @icon         https://ptpimg.me/3068n1.png
// @grant        none
// ==/UserScript==

function getIMDbID(currSite) {
    if(currSite == "tbd"){
        const ratingBlockElement = document.querySelector(".inl-rating-block")
        if(ratingBlockElement){
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
    else if(currSite == "rarbg"){
        // const imdbElement = document.querySelector("#imdb-title-link")
    }
    else if(currSite == "hdt"){
        const imdbElement = document.querySelector("#IMDBDetailsInfoHideShowTR")
        if(imdbElement){
            let imdbLink = imdbElement.children[0].children[0].href
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
else if(currURL.includes("rarbg")){
    currSite = "rarbg"
}
else if(currURL.includes("hd-torrents") || currURL.includes("hdts")){
    currSite = "hdt"
}
const imdbID = getIMDbID(currSite);
if(imdbID){
    let titleElement = null
    if(currSite == "tbd"){
        titleElement = $('div.inl-rating-block');
    }
    else if(currSite == "ptp"){
        titleElement = $('div.linkbox');
    }
    else if(currSite == "hdt"){
        titleElement = $('table.listadetails')
        titleElement = titleElement[0].children
    }
    let p = ''
    // rarbg
    p = p + '<a target="_blank" class="rarbg-search-link" href="https://rarbgaccess.org/torrents.php?imdb=' + imdbID + '" rel="noreferrer"><img src="https://ptpimg.me/2d5xqr.png" style="height:20px;width:54px;" title="RARBG"></a>'
    if(currSite != "ptp"){
        // ptp
        p = p + ' <a target="_blank" class="ptp-search-link" href="https://passthepopcorn.me/torrents.php?searchstr=' + imdbID + '" rel="noreferrer"><img src="https://ptpimg.me/fw83j6.png" style="height:30px;width:30x;" title="PassThePopcorn"></a>'
    }
    if(currSite != "hdt"){
        // hdt
        p = p + ' <a target="_blank" class="hdt-search-link" href="https://hd-torrents.org/torrents.php?search=' + imdbID + '" rel="noreferrer"><img src="https://ptpimg.me/5t0a01.png" style="height:20px;width:92px;" title="HD-Torrents"></a>'
    }
    // bhd
    p = p + ' <a target="_blank" class="bhd-search-link" href="https://beyond-hd.me/torrents?search=' + imdbID + '" rel="noreferrer"><img src="https://ptpimg.me/bxcd1o.png" style="height:20px;width:124px;" title="BeyondHD"></a>'
    // blu
    p = p + ' <a target="_blank" class="blu-search-link" href="https://blutopia.xyz/torrents?imdbId=' + imdbID + '" rel="noreferrer"><img src="https://ptpimg.me/8e8u62.png" style="height:30px;width:30px;" title="Blutopia"></a>'
    // uhdb
    p = p + ' <a target="_blank" class="uhdb-search-link" href="https://uhdbits.org/torrents.php?searchstr=' + imdbID + '" rel="noreferrer"><img src="https://ptpimg.me/jvrnek.png" style="height:20px;width:45px;" title="UHDBits"></a>'
    // kg
    p = p + ' <a target="_blank" class="kg-search-link" href="https://karagarga.in/browse.php?search=' + imdbID + '" rel="noreferrer"><img src="https://ptpimg.me/v47qy4.png" style="height:20px;width:57px;" title="Karagarga"></a>'
    // mtv
    p = p + ' <a target="_blank" class="mtv-search-link" href="https://www.morethantv.me/torrents/browse?searchtext=' + imdbID + '" rel="noreferrer"><img src="https://ptpimg.me/k7sbil.png" style="height:30px;width:30px;" title="MoreThanTV"></a>'
    // fl
    p = p + ' <a target="_blank" class="fl-search-link" href="https://filelist.io/browse.php?search=' + imdbID + '" rel="noreferrer"><img src="https://ptpimg.me/vmglcg.png" style="height:30px;width:67px;" title="FileList"></a>'
    // tl
    p = p + ' <a target="_blank" class="tl-search-link" href="https://www.torrentleech.org/torrents/browse/index/imdbID/' + imdbID + '" rel="noreferrer"><img src="https://ptpimg.me/q8s6g4.png" style="height:20px;width:74px;" title="TorrentLeech"></a>'
    if(currSite == "tbd"){
        titleElement[0].outerHTML = '<div>' + p + '</div> <p></p> <hr> <p></p>' + titleElement[0].innerHTML
    }
    else if(currSite == "ptp"){
        titleElement[0].innerHTML = '<p>' + p + '</p>' + titleElement[0].innerHTML
    }
    else if(currSite == "hdt"){
        titleElement[0].innerHTML = '<tr><td align="right" class="detailsleft"> Other Trackers:</td><td class="detailsright" align="center">' + p + '</td></tr>' + titleElement[0].innerHTML
    }
}
