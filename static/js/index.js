
window.addEventListener('DOMContentLoaded', () => {
    VANTA.BIRDS({
        el: "#header",
        mouseControls: false,
        touchControls: false,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        backgroundColor: 0xb0f1e,
        color1: 0xd42ff,
        color2: 0x9301ff,
        colorMode: "lerpGradient",
        quantity: 3.00
    });

    $("body").on("click", "#sim-2D", function() { $(window).attr('location','/2d.html') })
    $("body").on("click", "#sim-3D", function() { $(window).attr('location','/3d.html') })

});
