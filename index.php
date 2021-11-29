<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" type="text/css" href="assets/css/app.css">
    <title>Blobs Animation</title>
</head>
<body>

<?php
function rand_color() {
    return sprintf('#%06X', mt_rand(0, 0xFFFFFF));
}

?>
?>

<div id="app">
    <div id="svg-container">
        <svg id="svg" ref="svg" xmlns="http://www.w3.org/2000/svg" class="blob">
            <?php
            for ($i = 0; $i < 40; $i++) {
                echo '<linearGradient x1="0" y1="0" x2="100%" y2="100%" id="gradient'.$i.'"><stop stop-color="'. rand_color() .'" offset="0"/><stop stop-color="'. rand_color() .'" offset="100%"/></linearGradient>';
            }
            ?>
            <defs>
                <filter id="blobFilter">
                    <feGaussianBlur in="SourceGraphic" :key="blur" :std-deviation.camel="blur" result="blur"/>
                    <feColorMatrix in="blur" mode="matrix" :key="alphaMult+'-'+alphaAdd"
                                   :values="'1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 '+alphaMult+' '+alphaAdd"
                                   result="goo"/>
                    <!-- <feBlend in="SourceGraphic" in2="goo" /> -->
                </filter>
            </defs>
            <g :transform="transform">
                <circle v-for="e in elements" :cx="e.x" :cy="e.y" :r="e.r" :style="estyle(e)" class="elt"/>
            </g>
        </svg>
    </div>
    <div class="content">

    </div>
</div>


<script src="https://cdnjs.cloudflare.com/ajax/libs/dat-gui/0.7.5/dat.gui.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/randomcolor/0.5.2/randomColor.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vue"></script>

<script src="assets/js/app.js"></script>
</body>
</html>