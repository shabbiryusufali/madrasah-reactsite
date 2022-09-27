import '../../index.css';

function ChangeEmailForm() {
  return (
    
    <div className='mx-auto w-1/4 bg-slate-400 rounded p-5 pt-4'>
      <form method="post" action="changeEmail">
        <div className='mx-auto justify-center'>
          <h3 className=' text-center text-3xl font-semibold my-1'>Change Email Address:</h3>

          <div className='my-3'>
          <label for="email" className='font-bold'>New Email Address:</label>
          <input type="email" id="email" name="email" placeholder="New Email" className='rounded w-full text-center py-1 px-2' required />
          </div>
          <div className='my-3'>
          <label for="email2" className='font-bold'>Confirm Email Address:</label>
          <input type="email" id="email2" name="email2" placeholder="Confirm Email" className='rounded w-full text-center py-1 px-2' required/>
          </div>
          <input class="btn btn-sm btn-primary" className='py-2 px-4 rounded bg-blue-500 my-1 text-white font-semibold' type="submit" />
        </div>
      </form>
  </div>

     


  );
}

export default ChangeEmailForm;
