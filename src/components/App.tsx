import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'

import JPG from '@/assets/fut-jpg.jpg'
import SVG from '@/assets/fut-svg.svg' // Лоадер webpack позволяет вытаскивать SVG как компонент
import PNG from '@/assets/fut-png.png'

import classes from './App.module.scss'
const App = () => {
    const [count, setCount] = useState(0)

    if (__PLATFORM__ === 'desktop') {
        return <div>IS desktop PLATFORM</div>
    }
    if (__PLATFORM__ === 'mobile') {
        return <div>IS mobile PLATFORM</div>
    }

    return (
        <div>
            <h2>PLATFORM={__PLATFORM__}</h2>
            <div>
                <img height={200} width={200} src={JPG} alt="" />
                <img height={200} width={200} src={PNG} alt="" />
            </div>
            <div>
                <SVG fill={''} height={150} width={150} />
            </div>
            <Link to={'/about'}>About</Link>
            <Link to={'/shop'}>Shop</Link>
            <p>Count: {count}</p>
            <button
                className={classes.button}
                type="button"
                onClick={() => setCount(count + 1)}
            >
                button
            </button>
            <Outlet />
        </div>
    )
}

export default App
