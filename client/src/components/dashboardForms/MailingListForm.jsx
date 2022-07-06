import '../../index.css';

function MailingListForm() {
  return (
    <table>
    <form method="post" action="editMailingList">
      <h3>Join Mailing List</h3>
      <tr>
        <td>
          <label for="mailinglist">Would you like to be on the Mailing list?</label>
        </td>
        <td>
          <input type="radio" id="mailinglist" name="mailinglist" value="true" />
          <label>Yes</label>
          <input type="radio" id="mailinglist" name="mailinglist" value="false" />
          <label>No</label>
        </td>
      </tr>
      <tr>
        <td><input class="btn btn-sm btn-primary" type="submit" /></td>
      </tr>
    </form>
  </table>
  );
}

export default MailingListForm;
