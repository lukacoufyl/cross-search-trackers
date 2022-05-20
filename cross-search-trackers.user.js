// ==UserScript==
// @name         cross-search-trackers
// @namespace    https://lukacoufyl.github.io/cross-search-trackers/
// @version      0.2.4
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
// @match        https://beyond-hd.me/torrents*
// @match        https://beyond-hd.me/library*
// @match        https://rarbgaccess.org/torrents.php?imdb*
// @match        https://www.proxyrarbg.org/torrents.php?imdb*
// @match        https://rarbgtor.org/torrents.php?imdb*
// @match        https://rarbgto.org/torrents.php?imdb*
// @match        https://rarbgaccess.org/torrent/*
// @match        https://www.proxyrarbg.org/torrent/*
// @match        https://rarbgtor.org/torrent/*
// @match        https://rarbgto.org/torrent/*
// @match        https://telly.wtf/torrents/*
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
        if(currURL.includes("imdb")){
            let imdbLink = currURL
            if(imdbLink.endsWith("/")){
                imdbLink = imdbLink.slice(0,-1)
            }
            const imdbID = imdbLink.split("=").pop()
            return imdbID
        }
        else{
            let lista = $('td.lista')
            for(let i=0; i<lista.length; i++){
                if(lista[i].innerHTML.includes("imdb")){
                    if(lista[i].children[0].href.includes("imdb")){
                        let imdbLink = lista[i].children[0].href
                        if(imdbLink.endsWith("/")){
                            imdbLink = imdbLink.slice(0,-1)
                        }
                        const imdbID = imdbLink.split("/").pop()
                        return imdbID
                    }
                }
            }
        }
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
    else if(currSite == "bhd"){
        const imdbElement = document.querySelector(".hd-table")
        if(imdbElement){
            let imdbElementChildren = imdbElement.children[1].children
            for (let i = 0; i < imdbElementChildren.length; i++){
                if(imdbElementChildren[i].title.includes("IMDb")){
                    let imdbLink = imdbElementChildren[i].children[0].href
                    if(imdbLink.endsWith("/")){
                        imdbLink = imdbLink.slice(0,-1)
                    }
                    const imdbID = imdbLink.split("/").pop()
                    return imdbID
                }
            }
        }
    }
    else if(currSite == "telly"){
        const movDet = $('div.movie-details')
        if(movDet){
            let movDetChildren = movDet[0].children
            for (let i = 0; i < movDetChildren.length; i++){
                if(movDetChildren[i].innerHTML.includes("imdb")){
                    let imdbLink = movDetChildren[i].children[0].href
                    if(imdbLink.endsWith("/")){
                        imdbLink = imdbLink.slice(0,-1)
                    }
                    const imdbID = imdbLink.split("/").pop()
                    return imdbID
                }
            }
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
else if(currURL.includes("beyond-hd")){
    currSite = "bhd"
}
else if(currURL.includes("telly")){
    currSite = "telly"
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
    else if(currSite == "bhd"){
        titleElement = $('div.hd-table')
    }
    else if(currSite == "rarbg"){
        titleElement = $('h1.black')
    }
    else if(currSite == "telly"){
        titleElement = $('h1.movie-heading')
    }
    let p = ''
    if(currSite != "rarbg"){
        // rarbg
        p = p + '<a target="_blank" class="rarbg-search-link" href="https://rarbgaccess.org/torrents.php?imdb=' + imdbID + '" rel="noreferrer"><img src="https://ptpimg.me/2d5xqr.png" style="height:20px;width:54px;" title="RARBG"></a>'
    }
    if(currSite != "ptp"){
        // ptp
        p = p + ' <a target="_blank" class="ptp-search-link" href="https://passthepopcorn.me/torrents.php?searchstr=' + imdbID + '" rel="noreferrer"><img src="https://ptpimg.me/fw83j6.png" style="height:30px;width:30x;" title="PassThePopcorn"></a>'
    }
    if(currSite != "hdt"){
        // hdt
        p = p + ' <a target="_blank" class="hdt-search-link" href="https://hd-torrents.org/torrents.php?search=' + imdbID + '" rel="noreferrer"><img src="https://ptpimg.me/5t0a01.png" style="height:20px;width:92px;" title="HD-Torrents"></a>'
    }
    if(currSite != "bhd"){
        // bhd
        p = p + ' <a target="_blank" class="bhd-search-link" href="https://beyond-hd.me/torrents?search=' + imdbID + '" rel="noreferrer"><img src="https://ptpimg.me/bxcd1o.png" style="height:20px;width:124px;" title="BeyondHD"></a>'
    }
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
        titleElement[0].outerHTML = '<div>' + p + '</div> <p></p> <hr> <p></p>' + titleElement[0].outerHTML
    }
    else if(currSite == "ptp"){
        titleElement[0].innerHTML = '<p>' + p + '</p>' + titleElement[0].innerHTML
    }
    else if(currSite == "hdt"){
        titleElement[0].innerHTML = '<tr><td align="right" class="detailsleft"> Other Trackers:</td><td class="detailsright" align="center">' + p + '</td></tr>' + titleElement[0].innerHTML
    }
    else if(currSite == "bhd"){
        titleElement[0].outerHTML = titleElement[0].outerHTML + '<div>' + p + '</div>'
    }
    else if(currSite == "rarbg"){
        titleElement[0].outerHTML = titleElement[0].outerHTML + '<p>' + p + '</p>'
    }
    else if(currSite == "telly"){
        titleElement[0].outerHTML = titleElement[0].outerHTML + '<div class="other-trackers">' + p + '</div>'
    }
}
