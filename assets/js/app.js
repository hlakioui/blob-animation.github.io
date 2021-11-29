new Vue({
    el: "#app",
    data: {
        width: 0,
        height: 0,
        cx: 20,
        cy: 0,
        blur: 26,
        alphaMult: 100,
        alphaAdd: -8,
        randomColors: true,
        numElements: 80,
        duration: 6,
        elements: []
    },
    mounted() {
        this.onResize();
        window.addEventListener("resize", this.onResize);

        const gui = new dat.GUI();
        gui.add(this, "blur", 1, 50, 1);
        gui.add(this, "alphaMult", 0, 100);
        gui.add(this, "alphaAdd", -10, -1);
        gui.add(this, "randomColors");
        gui.add(this, "duration", 1, 100, 1);
        gui.add(this, "numElements", 20, 500, 10);
        gui.close();

        this.shuffle();
    },
    watch: {
        randomColors() {
            this.shuffle();
        },
        numElements() {
            this.shuffle();
        },
        duration() {
            this.shuffle();
        }
    },
    computed: {
        transform() {
            return this.translate(this.cx, this.cy);
        }
    },
    methods: {
        shuffle() {
            let elements = [];
            let fill = randomColor();
            for (let i = 0; i < this.numElements; i++) {
                if (this.randomColors)
                    fill = 'url("data:image/svg+xml,' +
                        '<svg xmlns=\'http://www.w3.org/2000/svg\'>' +
                        '<linearGradient id=\'grad\'><stop offset=\'0%\' stop-color=\''+ randomColor({ format: 'rgb' }) +'/>' +
                        '<stop offset=\'100%\' stop-color=\''+ randomColor({ format: 'rgb' }) +'/>' +
                        '</linearGradient>' +
                        '</svg>#grad") ' +
                        randomColor();
                let e = {
                    x: rnd(this.cx, true),
                    y: 0,
                    r: rnd(150),
                    fill,
                    delay: rnd(50, true),
                    duration: this.duration + rnd(5)
                };
                elements.push(e);
            }
            this.elements = elements;
        },
        onResize() {
            const r = this.$refs.svg.getBoundingClientRect();
            this.width = r.width;
            this.height = r.height;
            this.cx = r.width / 2;
            this.cy = r.height / 2;
        },
        estyle(e) {
            return {
                fill: e.fill,
                "shape-rendering": "crispEdges",
                "animation-delay": e.delay + "s",
                "animation-duration": e.duration + "s"
            };
        },
        translate(x, y) {
            return "translate(" + x + ", " + y + ")";
        }
    }
});

function rnd(max, negative) {
    return negative ? Math.random() * 2 * max - max : Math.random() * max;
}
