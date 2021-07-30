import React,{useState} from 'react'
import ClipLoader from "react-spinners/ClipLoader"
import { css } from "@emotion/react"

export default function Spinner({color,loading,size}){
    const override = css`
      display: block;
      margin: 0 auto;
      border-color: red;
    `
    return(
        <ClipLoader color={color} loading={loading} css={override} size={size}/>
    )
}
