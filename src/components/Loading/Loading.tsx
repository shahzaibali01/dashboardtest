import { Loader2 } from 'lucide-react'
import React from 'react'

type LoadingProps = {
  type?: string 
}

const Loading: React.FC<LoadingProps> = ({ type = 'content' }) => {
  return (
    <div className="h-screen flex justify-center items-center p-6">
      <div className="flex items-center gap-2">
        <Loader2 className="animate-spin w-5 h-5" />
        <span>Loading {type}...</span>
      </div>
    </div>
  )
}

export default Loading
