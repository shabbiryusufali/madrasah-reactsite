import '../../index.css';

function ChangeEmailForm() {
  return (
    <table>
    <form method="post" action="changeEmail">
      <h3>Change Email Address:</h3>
      <tr>
        <td><label for="email">New Email Address</label></td>
        <td><input type="email" id="email" name="email" placeholder="New Email" required /></td>
      </tr>
      <tr>
        <td><label for="email2">Confirm Email Address</label></td>
        <td><input type="email" id="email2" name="email2" placeholder="Confirm Email" required /></td>
      </tr>
      <tr>
        <td><input class="btn btn-sm btn-primary" type="submit" /></td>
      </tr>
    </form>
  </table>
  );
}

export default ChangeEmailForm;
