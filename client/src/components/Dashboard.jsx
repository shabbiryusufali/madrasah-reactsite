import ChangeEmailForm from "./dashboardForms/ChangeEmailForm";
import ChangeFNameForm from "./dashboardForms/ChangeFNameForm";
import ChangeLNameForm from "./dashboardForms/ChangeLNameForm";
import ChangePasswordForm from "./dashboardForms/ChangePasswordForm";
import MailingListForm from "./dashboardForms/MailingListForm";

function Dashboard() {
  return (
    <div className="App">

      <div class="text-start container bg-light">
        <br />
        <br />
        <br />
        <br />

        <div class="alert alert-secondary">
          <h2>ADMIN CONTROLS</h2>
          <p>
            <a class="btn-primary btn" href="/database">List Of Users</a> | <a class="btn btn-primary" href="/articles/new">Make a Blog Post</a><br /><br />
          </p>
          <div class="container">
            <br />
            <br />
            <br />
            <br />

            <table class="table table-striped table-responsive">
              <thead class="thead-dark">
                <h3>User Details</h3>
                <tr>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Email</th>
                </tr>
              </thead>
              <tbody>
                <td>
                </td>
                <td>
                </td>
                <td>
                </td>
              </tbody>
            </table>
            <br />
<ChangeFNameForm />
            <br />
<ChangeLNameForm />
            <br />
<ChangeEmailForm />
            <br />
         <ChangePasswordForm />
            <br />
           <MailingListForm />
            <p class="alert alert-danger text-danger">Please login to view a Dashboard</p>
            <br /><br /><br /><br />
          </div>
          </div>
          </div>
        </div >
        );
}

        export default Dashboard;
