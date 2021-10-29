import classNames from "classnames"
import styles from "@styles/components/LabelStructure.module.css";
import { useEffect, useState, useRef } from "react";
import dynamic from 'next/dynamic'
const P5Wrapper = dynamic(() => import('react-p5-wrapper'), { ssr: false })

export default function LabelStructure({ structure , bordered }) {

    structure.data = { 
        projects : [structure.projects_designer.length, structure.projects_other.length, structure.projects_supplier.length, structure.projects_workshop.length],
        memberships: structure.communities.length
    }

    const [width, setWidth] = useState(400)
    const ref = useRef(null);

    useEffect(async() => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setWidth(ref.current ? ref.current.offsetWidth : 30);
    }, [ref.current]);

    return (
        <div
            ref={ref}
            style={{ fontSize: `${width / 20}px` }}
            className={classNames(styles.label,
                { [`${styles.bordered}`]: bordered })}>
                <h2 className={styles.name}>{structure.name && structure.name}</h2>
                <div className={styles.adress}>{structure.adress && structure.adress}</div>
                <div className={styles.sketch}>
                    {structure.data && ( <Sketch data={structure.data}/> )}
                </div>
            <div className={styles.communities}>
                { structure.communities && (structure.communities.map((community, i) => ( <h3 key={i}>{community.name}</h3>)))}
            </div>

        </div>
    )
}




const Sketch = ({ data }) => {
    function sketch(p5) {


        const width = 500;
        const height = width;
        const dim = width* 1/2
        const x = width / 2;
        const y = x;
        const ep = width/8;

        let [others, suppliers, designers, workshops] = data.projects;
        let total = others + suppliers + designers + workshops;
        total = 15;

        let comMemberships = data.memberships;

        let [c1, c2, c3, c4] = ["#D3494E", "#FFE5AD", "#13BBAF", "#7BC8F6"]
        let empty = "#e1e1e1";


        p5.setup = function() {
            p5.createCanvas(width, height);
            p5.strokeCap(p5.ROUND);
            p5.angleMode(p5.DEGREES);
            p5.background(255);

            c1 = p5.color(c1),
            c2 = p5.color(c2),
            c3 = p5.color(c3),
            c4 = p5.color(c4);
            empty = p5.color(empty);

            p5.stroke(empty);
            p5.strokeWeight(ep);
            p5.noFill()
            p5.circle(x, y, dim);
            p5.noStroke()
            communities(comMemberships)
            projects(x, y, dim);
        }
        function communities(n) {
            n > 4 ? 4 : n;
            let base = p5.sin(45) * dim / 2;
            let end = p5.sin(45) * (dim / 2 + (width - dim) / 2);
            let directions = [[1, 1], [1, -1], [-1, -1], [-1, 1]]
            p5.shuffle(directions, true)
            p5.push();
            p5.stroke(empty);
            p5.strokeWeight(ep);
            for (let i = 0; i < n; i++) {
                let dir = directions[i]
                p5.line(x + base * dir[0], y + base * dir[1], x + end * dir[0], y + end * dir[1])
            }
            p5.pop()

        }

        function projects(d) {
            let startValue = p5.random(1);
            let range = 0;

            range = others / total;
            drawSlice(c1, startValue, startValue + range);
            startValue += range;
            range = suppliers / total;
            drawSlice(c2, startValue, startValue + range);
            startValue += range;
            range = designers / total;
            drawSlice(c3, startValue, startValue + range);
            startValue += range;
            range = workshops / total;
            drawSlice(c4, startValue, startValue + range);
            startValue += range;

        }

        function drawSlice(color, percent1, percent2) {
            p5.stroke(color);
            p5.strokeWeight(ep);
            p5.ellipseMode(p5.CENTER);
            p5.arc(x, y, dim, dim, -90 + percent1 * 360, -90 + percent2 * 360);
        }

    };
    return (<P5Wrapper sketch={sketch} />)
}