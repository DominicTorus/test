import React from "react";


export default function ImgContainer({ url  }: { url: String }) {
    return (
        <img src={url as string } />
    )
}