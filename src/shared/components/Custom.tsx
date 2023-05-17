import {FunctionComponent, useEffect} from 'react'

const CustomComponent: FunctionComponent<any> = () => {
    useEffect(() => {
        console.log("INFO: Custom Component")
    },[])
  return (
    <div>Custom</div>
  )
}

export default CustomComponent