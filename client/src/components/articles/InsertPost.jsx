import '../../index.css';

function InsertPost() {
  return (
    <div className='App'>
        <form method='post' action='/articleFunctions/new'>
            <div className='p-2'>
            <br />
            <h1 className='text-6xl text-center'>New Post</h1>
            <br />
            <br />
            <a href='/articles' className='rounded px-4 py-2 bg-blue-500 hover:bg-blue-900 text-white'>Back</a>
            <br />
            <br />
            <label for='title' className='text-white'>Title:</label>
            <br />
            <input type='text' name='title' id='title' className='rounded w-full px-2 py-1 ' />
            <br />
            <label for='description' className='text-white'>Description:</label>
            <br />
            <input type='text' name='description' id='description' className='rounded w-full px-2 py-1 ' />
            <br />
            <label for='markdown' className='text-white'>Content:</label>
            <br />
            <textarea name="markdown" id="markdown" rows='20' className='w-full px-2 py-1 rounded'></textarea>
            <input type='submit' value='Submit' className='rounded bg-blue-500 hover:bg-blue-900 text-white px-4 py-2' />
            </div>
        </form>
    </div>
  );
}

export default InsertPost;
