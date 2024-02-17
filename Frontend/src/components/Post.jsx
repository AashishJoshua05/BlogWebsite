import React from 'react'


function estiamtedReadTime(str) {
    let wordCount = str.trim().split(/\s+/).length;
    let wpmCal = wordCount /183
    return (Math.round(wpmCal * 100) / 100).toFixed(2)
}


function Post( {title, summary, coverImg, content, createdAt} ) {
    const readTime = estiamtedReadTime(content)
    const date = new Date(createdAt)
    

  return (
    <div className='border-4 mx-36 px-2 flex flex-col space-y-4 '>
        <h1 className='font-bold text-2xl '>{title}</h1>
        <p className='text-zinc-700 text-ellipsis overflow-hidden h-12'>{summary}</p>
        <div>
            <p className='text-sm text-zinc-400'>Date:{date.toDateString()} | Estimated Reading Time: {readTime}m </p>
        </div>
    </div>
  )
}

export default Post