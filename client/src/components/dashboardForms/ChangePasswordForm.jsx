import '../../index.css';

function ChangePasswordForm() {
  return (
    <div>
    <table>
    <form method="post" action="changePassword">
      <h3>Change Password:</h3>
      <tr>
        <td><label for="oldpass">Old Password</label></td>
        <td><input type="password" id="oldpass" name="oldpass" placeholder="Old Password" required /></td>
      </tr>
      <tr>
        <td><label for="pass">New Password</label></td>
        <td><input type="password" id="pass" name="pass" placeholder="New Password" required /></td>
      </tr>
      <tr>
        <td><label for="passv2">Confirm Password</label></td>
        <td><input type="password" id="passv2" name="passv2" placeholder="Confirm Password" required /></td>
      </tr>
      <tr>
        <td><input class="btn btn-sm btn-primary" type="submit" /></td>
      </tr>
    </form>
  </table>
  </div>
  );
}

export default ChangePasswordForm;
