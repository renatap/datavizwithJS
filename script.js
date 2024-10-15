//make function that displays numbers when hovering over each circle
//try to fix colors of legend

const datasets = [];

function graph(p) {
    p.setup = function () {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.background(245, 244, 239);
    };
    p.draw = async function () {
        const drawing = await getData();
        let rmargin = 50;
        let tmargin = 50;
        let bmargin = 50;

        p.noLoop();

        p.stroke(0);
        p.strokeWeight(0.1);


        p.textFont('Lato', 12);   
        p.fill(0, 80);
        p.stroke(0);

        // scale
        p.line(rmargin, tmargin - 15, 50, p.height);
        for (let i = 0; i <= 10; i++) {
            let ticks = ((p.height - tmargin - bmargin) / 50 * i);
            p.line(rmargin, (ticks * 5) + tmargin, rmargin - 5, (ticks * 5) + tmargin);
            p.text(i * 5, rmargin - 20, 4 + p.height - bmargin - ticks * 5)
        }
        p.textFont('Lato', 11);
        p.textStyle(p.ITALIC);
        p.text('Share who reported\nlifetime anxiety\nor depression in 2020\n%', rmargin + 10, tmargin);

        // bubbles and data
        for (let i = 0; i < datasets.length; i++) {
            let y = p.map(datasets[i].y, 0, 50, p.height - tmargin, 0) + tmargin;
            let x = ((p.windowWidth - 100) / 40 * datasets[i].x) + rmargin;
            p.noStroke();
            p.fill(0, 20, 197, datasets[i].alpha / 1.5);
            p.circle(x, y, datasets[i].r);
            p.fill(0, 80);
            p.stroke(0);
            p.drawingContext.setLineDash([1.5]);
            p.line(x, y, x, p.height - bmargin)
            p.drawingContext.setLineDash([]);

            p.push();
            p.translate(x, p.height - bmargin)
            p.rotate(p.HALF_PI * 3);
            p.text(datasets[i].c, 0, 0)
            p.pop();
        }
    }

    
}

new p5(graph);


async function getData() {
    const response = await fetch('mentalhealthdataset.csv');
    const data = await response.text();
    const table = data.split('\n').slice(1);
    table.forEach(row => {
        const columns = row.split(',');

        const country = columns[0];
        const transp1 = columns[1];
        const transp2 = columns[2];
        const share = columns[3];
        const pop = columns[4] / 2000000 + 3;
        const long = columns[5];
        const order = columns[6];
        const comfort = columns[7];
        datasets.push({ x: order, y: share, r: pop, c: country, alpha: comfort })

    })
    return { datasets }
}



function drawLegend(p) {

    p.setup = function () {
        p.createCanvas(80, 150);
    };

    p.draw = function () {
        p.noStroke();
        p.fill(0, 20, 197, 50);
        p.circle(40, 40, 50)
        p.fill(0, 80);
        p.stroke(0);
        p.strokeWeight(0.3);
        p.drawingContext.setLineDash([1.5]);
        p.line(40, 40, 40, 200);
        p.drawingContext.setLineDash([]);
        p.noLoop();
    };

};

function drawLegendPopulation(p) {

    p.setup = function () {
        p.createCanvas(260, 130);
    };

    p.draw = function () {
        let pos1 = 40;
        let pos2 = 140;
        let pos3 = 220;
        let posY1 = 40;
        let posY2 = 100;

        p.noStroke();
        p.fill(0, 20, 197, 100);
        p.circle(pos1, posY1, 53);
        p.circle(pos2, posY1, 28);
        p.circle(pos3, posY1, 8);
        p.fill(0);
        p.textFont('Mate', 12);
        p.textAlign(p.CENTER);
        p.textStyle(p.ITALIC);
        p.text('100,000,000', pos1, posY2)
        p.text('50,000,000', pos2, posY2)
        p.text('10,000,000', pos3, posY2)
        p.noLoop();
    };

};

function drawLegendComfort(p) {

    p.setup = function () {
        p.createCanvas(120, 150);
    };

    p.draw = function () {
        let posX = 30;
        let posY1 = 30;
        let posY2 = 75;
        let posY3 = 120;

        p.noStroke();
        p.fill(0, 20, 197, 63);
        p.circle(posX, posY1, 25);
        p.fill(0, 20, 197, 45);
        p.circle(posX, posY2, 25);
        p.fill(0, 20, 197, 30);
        p.circle(posX, posY3, 25);
        p.fill(0);
        p.textFont('Mate', 12);

        p.textAlign(p.LEFT, p.CENTER);
        p.textStyle(p.ITALIC);
        p.text('63%', posX + 30, posY1)
        p.text('45%', posX + 30, posY2)
        p.text('30%', posX + 30, posY3)
        p.noLoop();
    };

};
