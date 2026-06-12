function AuthForm({
  title,
  buttonText,
  fields,
  formData,
  onChange,
  onSubmit,
  loading,
  footerText,
  footerLinkText,
  onFooterClick,
}) {
  return (
    <main className="auth-page">
      <section className="auth-card">
        <p className="eyebrow">SportsSphere Account</p>
        <h1>{title}</h1>

        <form onSubmit={onSubmit} className="auth-form">
          {fields.map((field) => (
            <label key={field.name}>
              <span>{field.label}</span>

              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={onChange}
                placeholder={field.placeholder}
              />
            </label>
          ))}

          <button type="submit" disabled={loading}>
            {loading ? "Please wait..." : buttonText}
          </button>
        </form>

        <p className="auth-footer">
          {footerText}{" "}
          <button type="button" onClick={onFooterClick}>
            {footerLinkText}
          </button>
        </p>
      </section>
    </main>
  );
}

export default AuthForm;