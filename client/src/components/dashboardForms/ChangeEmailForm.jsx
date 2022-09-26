import '../../index.css';

function ChangeEmailForm() {
  return (
    
    <div className='text-center bg-slate-400 rounded p-2'>
      <form method="post" action="changeEmail">
        <div className='w-1/2 mx-auto justify-center'>
          <h3 className='text-3xl font-semibold my-1'>Change Email Address:</h3>

          <div className='my-1'>
          <label for="email" className='font-bold'>New Email Address:</label>
          <br />
          <input type="email" id="email" name="email" placeholder="New Email" className='rounded text-center py-1 px-2' required />
          </div>
          <div className='my-1'>
          <label for="email2" className='font-bold'>Confirm Email Address:</label>
          <br />
          <input type="email" id="email2" name="email2" placeholder="Confirm Email" className='rounded text-center py-1 px-2' required/>
          </div>
          <input class="btn btn-sm btn-primary" className='py-2 px-4 rounded bg-blue-500 my-1 text-white font-semibold' type="submit" />
        </div>
      </form>
  </div>

     


  );
}

export default ChangeEmailForm;
