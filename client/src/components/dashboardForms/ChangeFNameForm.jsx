import '../../index.css';

function ChangeFNameForm() {
  return (
    <table>
    <form method="post" action="changeFirstName">
      <h3>Change First Name:</h3>
      <tr>
        <td><label for="fname">New First Name</label></td>
        <td><input type="text" id="fname" name="fname" placeholder="New First Name" required /></td>
      </tr>
      <tr>
        <td><label for="fname2">Confirm First Name</label></td>
        <td><input type="text" id="fname2" name="fname2" placeholder="Confirm First Name" required /></td>
      </tr>
      <tr>
        <td><input class="btn btn-sm btn-primary" type="submit" /></td>
      </tr>
    </form>
  </table>
  );
}

export default ChangeFNameForm;
