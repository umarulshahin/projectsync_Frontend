import React, { useEffect, useState } from 'react'

const Spinner = ({children}) => {

  const [ShowSpinner , setShowSpinner] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSpinner(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <>
    {ShowSpinner ? (
        <div className=" min-w-full min-h-screen flex justify-center items-center">
          <div
            className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-yellow-500 mx-auto"
          ></div>
          <h2 className="text-zinc-900 dark:text-white mt-4">Loading...</h2>
        </div>
      ) : (
        children
      )}
      </>
  )
}

export default Spinner