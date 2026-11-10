# Hero v2 candidates
Current hero and src/ untouched.

## Delivered
- B Product Convergence: public/video/candidates/hero-b.mp4 (4,261,543 bytes), hero-b.webm (1,908,948 bytes); public/images/candidates/hero-b-poster.webp. 7s, 1920x1080, 24fps, no audio. Three coloured streams converge into a red energy ring. Hero rating 6/10: energetic but bright trails invade headline area and portrait crop loses narrative.
- C The Forge: public/video/candidates/hero-c.mp4 (1,685,174 bytes), hero-c.webm (686,686 bytes); public/images/candidates/hero-c-poster.webp. Same specs. Angular graphite slabs rise into a ruby-seamed structure. Hero rating 8/10: strongest architecture and mobile framing. Recommendation among completed clips.

Both use one-second circular crossfade (source seconds 7–8 into 0–1); output starts at source second 1. This avoids a hard cut but is visibly a dissolve, especially C. Not claimed seamless. Existing left-side website gradient should remain; B needs stronger darkening. C sparks have pale warm highlights, B violet spark can read pink in motion. No visible text, faces or people in sampled frames.

## Pending A Ignition
Higgsfield job job_775a9724-b34e-40aa-87ff-e27f1f2298d3, request 01a1a99e-... (use job id). Last checked still running after roughly 10 minutes. Collect with higgsfield_job action=result save_to=raw/hero-v2/a. Then bash raw/hero-v2/encode.sh a. Inspect sheet and share video before selecting.

## Generation record
Three video submissions total: kling-video/v4.0/text-to-video, duration 8, 1080p, 16:9. B job_1cf0d511-953a-415b-bd9c-ab90f1e2c4af; C job_a822d885-31ac-428e-a6b3-1472303020a7.
One image-to-video upload attempt with 1280x720 small JPEG failed BEFORE submission with false >20MB validation error. Hence generated keyframes were concept exploration, NOT actual conditioning frames.
Built-in image-generation concept masters: keyframe-a.png, keyframe-b.png, keyframe-c.png. Four image calls total (first A image displayed but inaccessible host path; second A saved).
Encoding recipe: encode.sh. Raw provider masters: b.mp4 and c.mp4.
QA: contact sheets sheet-b.jpg/sheet-c.jpg (one frame per second), seam-b.jpg/seam-c.jpg (5fps dissolve sampling), mobile-b.jpg/mobile-c.jpg (60% horizontal portrait crop). Inspected all of those. ffprobe verifies H264/VP9, 1920x1080, 7s, video-only. Actual real-time playback on device and website integration not checked.
