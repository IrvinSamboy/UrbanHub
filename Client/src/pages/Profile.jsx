import Header from "../components/Header";
import LisOurPublications from "../components/ProfileComponents/LisOurPublications";
import ProfileInfo from "../components/ProfileComponents/ProfileInfo";

export default function Profile() {
  return (
    <>
     
      <Header />
      <div className="grid grid-cols-60/40 gap-10 max-w-5xl mx-auto py-10">
        <div>
          <ProfileInfo />
          <LisOurPublications />
        </div>
        <div>
          <h2 className='text-2xl'>Mensajes</h2>
          <div className='h-full'>
              <div className='mt-4 overflow-y-auto h-[50%]'>
                <div className='flex items-center gap-3 bg-white p-3 mb-3'>
                  <img className='w-10 h-10 rounded-full' 
                  src="https://lh3.googleusercontent.com/a/ACg8ocJYyv-NEPEcUJds9KN1I6_voC55enouZq-YCZpDd9L3Zw5hGVha=s96-c" alt="" />
                  <p className='font-bold'>John Doe</p>
                  <p className='font-light'>Lorem impsun</p>
                </div>

                <div className='flex items-center gap-3 bg-white p-3 mb-3'>
                  <img className='w-10 h-10 rounded-full' 
                  src="https://lh3.googleusercontent.com/a/ACg8ocJYyv-NEPEcUJds9KN1I6_voC55enouZq-YCZpDd9L3Zw5hGVha=s96-c" alt="" />
                  <p className='font-bold'>John Doe</p>
                  <p className='font-light'>Lorem impsun</p>
                </div>

                <div className='flex items-center gap-3 bg-white p-3 mb-3'>
                  <img className='w-10 h-10 rounded-full' 
                  src="https://lh3.googleusercontent.com/a/ACg8ocJYyv-NEPEcUJds9KN1I6_voC55enouZq-YCZpDd9L3Zw5hGVha=s96-c" alt="" />
                  <p className='font-bold'>John Doe</p>
                  <p className='font-light'>Lorem impsun</p>
                </div>

                <div className='flex items-center gap-3 bg-white p-3 mb-3'>
                  <img className='w-10 h-10 rounded-full' 
                  src="https://lh3.googleusercontent.com/a/ACg8ocJYyv-NEPEcUJds9KN1I6_voC55enouZq-YCZpDd9L3Zw5hGVha=s96-c" alt="" />
                  <p className='font-bold'>John Doe</p>
                  <p className='font-light'>Lorem impsun</p>
                </div>

                <div className='flex items-center gap-3 bg-white p-3 mb-3'>
                  <img className='w-10 h-10 rounded-full' 
                  src="https://lh3.googleusercontent.com/a/ACg8ocJYyv-NEPEcUJds9KN1I6_voC55enouZq-YCZpDd9L3Zw5hGVha=s96-c" alt="" />
                  <p className='font-bold'>John Doe</p>
                  <p className='font-light'>Lorem impsun</p>
                </div>

                <div className='flex items-center gap-3 bg-white p-3 mb-3'>
                  <img className='w-10 h-10 rounded-full' 
                  src="https://lh3.googleusercontent.com/a/ACg8ocJYyv-NEPEcUJds9KN1I6_voC55enouZq-YCZpDd9L3Zw5hGVha=s96-c" alt="" />
                  <p className='font-bold'>John Doe</p>
                  <p className='font-light'>Lorem impsun</p>
                </div>
              </div>
          </div>

        </div>
      </div>
    </>
  );
}
