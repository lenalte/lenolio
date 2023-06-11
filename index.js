const track = document.getElementById("image-track");

window.onmousedown = e => {
    track.dataset.mouseDownAt = e.clientX;

}

window.onmousemove = e => {
    if (track.dataset.mouseDownAt === "0") return;

    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX;
    const maxDelta = window.innerWidth / 2;

    const percentage = (mouseDelta / maxDelta) * -100
    nextPercentage = parseFloat(track.dataset.prevPercentage) + percentage;
    nextPercentage = Math.min(nextPercentage, 0);
    nextPercentage = Math.max(nextPercentage, -100);



    // der Text soll verschwinden wenn man die Bilder verschiebt:

    const textElement = document.getElementsByClassName("text")[0];

    if (nextPercentage < 0) {
        textElement.classList.add("hidden");
    } else {
        textElement.classList.remove("hidden");
    }



    track.dataset.percentage = nextPercentage;

    track.animate({
        transform: `translate(${nextPercentage}%, -50%)`
    }, { duration: 1200, fill: "forwards" });

    for (const image of track.getElementsByClassName("image")) {
        image.animate({
            objectPosition: `${100 + nextPercentage}% center`
        }, { duration: 1200, fill: "forwards" });
    }
}

window.onmouseup = e => {
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage;
}



window.onscroll = e => {
    const textElement1 = document.getElementById("text1");
    const textElement2 = document.getElementById("text2");
    const frameElement = document.getElementById("frame");
    const imageTrack = document.getElementById("image-track");

    // Calculate new top position depending on scroll position
    let newTop = window.scrollY + 15 * window.innerHeight / 100; // 15% of viewport height

    // Change top property
    textElement1.style.top = `${newTop}px`;
    textElement2.style.top = `${newTop}px`;

    // Check if we scrolled past the initial screen height
    if (window.scrollY > window.innerHeight) {
        // Hide the first text and show the second
        textElement1.classList.add("hidden");
        textElement2.classList.remove("hidden");
    } else {
        // Show the first text and hide the second
        textElement1.classList.remove("hidden");
        textElement2.classList.add("hidden");
    }

    if (window.scrollY > window.innerHeight + imageTrack.offsetHeight) {
        let newImageTrackTop = window.innerHeight + imageTrack.offsetHeight - window.scrollY;
        imageTrack.style.top = `${newImageTrackTop}px`;
        textElement1.style.top = `${newTop - window.scrollY}px`;
        textElement2.style.top = `${newTop - window.scrollY}px`;
        frameElement.style.marginTop = `${newImageTrackTop}px`;
    } else {
        imageTrack.style.top = "50%";
        frameElement.style.marginTop = "0px";
    }
}


