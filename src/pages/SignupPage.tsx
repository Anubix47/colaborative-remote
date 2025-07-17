import SignupForm from "../components/auth/SignupForm";

const SignupPage = () => {
  return (
    <div className="min-h-screen bg-emerald-200 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">TeamCollab</h1>
          <p className="mt-2 text-gray-600">Crea una cuenta para comenzar</p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-emerald-50 py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <SignupForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
