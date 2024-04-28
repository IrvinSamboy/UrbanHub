import { IoIosTime } from "react-icons/io";
import { IoExtensionPuzzle } from "react-icons/io5";
import { MdOutlineSecurity } from "react-icons/md";


export default function AboutComponent() {
  return (
    <div className="max-w-5xl mx-auto">
      <h2 className=" text-3xl text-center my-10">Sobre nosotros</h2>
       <div className='grid grid-cols-3 gap-8'>
       <div className='text-center'>
            <div className='flex items-center justify-center'>
                <IoIosTime className='text-9xl text-[#1BAC91]' />
            </div>
            <h3 className='my-4 text-2xl'>EFICIENCIA</h3>
            <p className='text-lg'>Possimus, suscipit repudiandae. Autem deserunt aliquid deleniti sit minus consectetur obcaecati molestiae dolorem natus dolores reiciendis tempore, explicabo cum nobis laudantium. Voluptates?</p>
        </div> 
        <div className='text-center'>
            <div className='flex items-center justify-center'>
                <MdOutlineSecurity className='text-9xl text-[#1BAC91]' />
            </div>
            <h3 className='my-4 text-2xl'>EFICIENCIA</h3>
            <p className='text-lg'>Possimus, suscipit repudiandae. Autem deserunt aliquid deleniti sit minus consectetur obcaecati molestiae dolorem natus dolores reiciendis tempore, explicabo cum nobis laudantium. Voluptates?</p>
        </div> 
        <div className='text-center'>
            <div className='flex items-center justify-center'>
                <IoExtensionPuzzle className='text-9xl text-[#1BAC91]' />
            </div>
            <h3 className='my-4 text-2xl'>EFICIENCIA</h3>
            <p className='text-lg'>Possimus, suscipit repudiandae. Autem deserunt aliquid deleniti sit minus consectetur obcaecati molestiae dolorem natus dolores reiciendis tempore, explicabo cum nobis laudantium. Voluptates?</p>
        </div> 
       </div>
    </div>
  )
}
