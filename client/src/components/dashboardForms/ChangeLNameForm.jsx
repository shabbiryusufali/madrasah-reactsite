import '../../index.css';

function ChangeLNameForm() {
  return (
    <table>
    <form method="post" action="changeLastName">
      <h3>Change Last Name:</h3>
      <tr>
        <td><label for="lname">New Last Name</label></td>
        <td><input type="text" id="lname" name="lname" placeholder="New Last Name" required /></td>
      </tr>
      <tr>
        <td><label for="lname2">Confirm Last Name</label></td>
        <td><input type="text" id="lname2" name="lname2" placeholder="Confirm Last Name" required /></td>
      </tr>
      <tr>
        <td><input class="btn btn-sm btn-primary" type="submit" /></td>
      </tr>
    </form>
  </table>
  );
}

export default ChangeLNameForm;
