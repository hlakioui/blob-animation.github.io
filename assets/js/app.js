new Vue({
    el: "#app",
    data: {
        width: 0,
        height: 0,
        cx: 10,
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
            let hexString = "0123456789abcdef";
            let elements = [];
            let fill = randomColor({luminosity: "random", format: "rgb"});
            for (let i = 0; i < this.numElements; i++) {
                if (this.randomColors)
                    fill = randomColor({ count: 100, luminosity: "random", format: "rgb" });
                let e = {
                    x: rnd(this.cx, true),
                    y: 0,
                    r: rnd(150),
                    fill,
                    delay: rnd(100, true),
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