import dynamic from 'next/dynamic'
import sketch from '@components/Sketchp5'
const P5Wrapper = dynamic(
  () => import('react-p5-wrapper'), { ssr: false })


export default function Sketch(props) { 
    return(<P5Wrapper sketch={sketch} />)
}