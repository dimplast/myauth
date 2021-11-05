import supabase from '$lib/db'


export async function post(request) {
  let email = request.body.get('email')
  let password = request.body.get('password')

  const {session, user, error} = await supabase.auth.signUp({email, password})

  if (error) {
    console.log(error)
    
  }

  // console.log('USER',user)
  // console.log('SESSION',session)
  // console.log('ERROR',error)

  return {
    status: 200,
    body: 'success',
    headers: {
      'set-cookie': `session=${session.user.email}; Path=/; HttpOnly; Secure; SameSite=Strict; Expires=${new Date(session.expires_at * 1000).toUTCString()};`
    }
  }
}