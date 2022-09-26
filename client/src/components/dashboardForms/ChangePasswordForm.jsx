import '../../index.css';

function ChangePasswordForm() {
  return (
    <div className='text-center bg-slate-400 rounded p-2'>
      <form method="post" action="changePassword">
        <div className='w-1/2 mx-auto justify-center'>
          <h3 className='text-3xl font-semibold my-1'>Change Password:</h3>
          <div className='my-1'>
          <label for="oldpass" className='font-bold'>Old Password: </label>
          <br />
          <input type="password" id="oldpass" name="oldpass" placeholder="Old Password" className='rounded text-center py-1 px-2' required />
          </div>
          <div className='my-1'>
          <label for="pass" className='font-bold'>New Password: </label>
          <br />
          <input type="password" id="pass" name="pass" placeholder="New Password" className='rounded text-center py-1 px-2' required />
          </div>
          <div className='my-1'>
          <label for="passv2" className='font-bold'>Confirm Password: </label>
          <br />
          <input type="password" id="passv2" name="passv2" placeholder="Confirm Password" className='rounded text-center py-1 px-2' required/>
          </div>
          <input class="btn btn-sm btn-primary" className='py-2 px-4 rounded bg-blue-500 my-1 text-white font-semibold' type="submit" />
        </div>
      </form>
  </div>
  );
}

export default ChangePasswordForm;
