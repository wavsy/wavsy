import { PUBLIC_EMAIL, SITE_URL } from "@/lib/site";

type ApplicationEmail = {
  subject: string;
  text: string;
  replyTo: string;
};

type FormSubmitResponse = {
  success?: string;
  message?: string;
};

// FormSubmit delivers the application to the studio Gmail. The inbox confirms
// the address once; after that every submission arrives there.
export async function sendApplicationEmail(
  email: ApplicationEmail,
): Promise<"ok" | "activate" | "failed"> {
  const to = process.env.CAREERS_TO_EMAIL || PUBLIC_EMAIL;

  try {
    const response = await fetch(`https://formsubmit.co/ajax/${to}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Origin: SITE_URL,
        Referer: `${SITE_URL}/`,
      },
      body: JSON.stringify({
        _subject: email.subject,
        _replyto: email.replyTo,
        _captcha: "false",
        _template: "box",
        email: email.replyTo,
        message: email.text,
      }),
    });

    const data = (await response.json()) as FormSubmitResponse;
    if (String(data.success) === "true") return "ok";
    if ((data.message ?? "").toLowerCase().includes("activat")) return "activate";

    console.error("Career applications: email was not accepted.");
    return "failed";
  } catch (error) {
    console.error("Career applications: email request failed.", error);
    return "failed";
  }
}
