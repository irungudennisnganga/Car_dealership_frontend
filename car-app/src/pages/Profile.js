import imageplaceholder from '../images/imageplaceholder.jpg';


export default function Profile() {
  return (
    <div className=" bg-cardbackground m-auto mt-10 relative w-[600px] h-[300px]">
      <div className="flex gap-6">
        <div className="w-[300px]">
            <div className='pl-2'>
              <img alt="Beatrice Mwangi" src={imageplaceholder} className='w-[100px] h-[100px] object-cover m-3 ' />
            </div>
          <div className="flex flex-col pl-2">
            <div className="grid gap-1.5 mt-4 text-sm text-gray-500 dark:text-gray-400 flex-1 p-2">
              <p className="font-medium"><span className='font-semibold'>Name:</span>  Beatrice Mwangi</p>
              <p><span className='font-semibold'>Email:</span> beatricemwangi@gmail.com</p>
              <p><span className='font-semibold'>Contact:</span>  0735474364</p>
              <p><span className='font-semibold'>Role:</span>  Seller</p>
            </div>
          </div>
        </div>
        <div className="flex-1 m-3">
          <div>
            <div>SALES</div>
          </div>
          <div className="grid gap-2">
            <p className="text-base "><span className='font-semibold'>Total sales made:</span>  20</p>
            <p className="text-base "><span className='font-semibold'>Commission earned: </span> 200,000</p>
          </div>
        </div>
      </div>
      <div className=' absolute right-6'>
        <button className='bg-red-600 rounded p-1 m-1'>Log Out</button>
      </div>
    </div>
  )
}

