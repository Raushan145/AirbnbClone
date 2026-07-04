import React from 'react'
import { useNavigate } from 'react-router-dom'

const PageNotFound = () => {
    const navigate = useNavigate();
  return (
    <>

    <section class="page_404">
	<div class="container">
		<div class="row">	
		<div class="col-sm-12 ">
		<div class="col-sm-10 col-sm-offset-1  text-center">
		<div class="four_zero_four_bg">
			<h1 class="text-center ">404</h1>
		
		
		</div>
		
		<div class="contant_box_404">
		<h3 class="h2">
		Look like you're lost
		</h3>
		
		<p>the page you are looking for not avaible!</p>
		
            <button onClick={()=> {
                if(window.history.length > 1){
                    navigate(-1);
                }else{
                    navigate("/")
                }
            } 
        }
        className="relative rounded-full bg-blue-600 text-white overflow-hidden border-2 border-blue-600 px-6 mt-3 py-2 text-blue-600 transition-colors duration-300 before:absolute before:top-0 before:left-[-100%] before:h-full before:w-full before:bg-blue-600 before:transition-all before:duration-300 before:content-[''] hover:text-white hover:before:left-0 before:-z-10"
             >
                Go Back
            </button>
		{/* <a href="" class="link_404">Go to Home</a> */}
	</div>
		</div>
		</div>
		</div>
	</div>
     </section>
      
    </>
  )
}

export default PageNotFound
