export interface IAccessUpdatePasswordTemplate {
  toEmail: string;
  token: string;
  redirectUrl: string;
}

export function accessUpdatePasswordTemplate(
  params: IAccessUpdatePasswordTemplate,
) {
  return `<div style="background-size: cover; background: #ededed; padding: 24px;">
    <div
      style="
        width: 500px;
        margin: auto;
        background: white;
        border-radius: 32px;
        padding: 24px 0;
      "
    >
      <div style="width: 328px; margin: 0 auto;">
        <h3 style="color: #000000; margin: 40px 0 24px; text-align: center;">
        Confirmação de E-mail
        </h3>

        <p>
          <strong>Token: </strong>
          ${params.redirectUrl}/${params.token}
        </p>
      </div>
    </div>
  </div>`;
}
