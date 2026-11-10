#!/bin/bash
set -euo pipefail
for id in "$@"; do
 ffmpeg -v error -y -i raw/hero-v2/$id.mp4 -filter_complex "[0:v]fps=24,scale=1920:1080,setsar=1,split=2[x][y];[x]trim=start=1:end=8,setpts=PTS-STARTPTS[body];[y]trim=start=0:end=1,setpts=PTS-STARTPTS[head];[body][head]xfade=transition=fade:duration=1:offset=6,format=yuv420p[v]" -map "[v]" -an -c:v libx264 -preset medium -crf 23 -maxrate 5500k -bufsize 11000k -movflags +faststart public/video/candidates/hero-$id.mp4
 ffmpeg -v error -y -i public/video/candidates/hero-$id.mp4 -an -c:v libvpx-vp9 -b:v 0 -crf 34 -row-mt 1 -cpu-used 4 public/video/candidates/hero-$id.webm
 ffmpeg -v error -y -i public/video/candidates/hero-$id.mp4 -frames:v 1 -quality 82 public/images/candidates/hero-$id-poster.webp
 ffmpeg -v error -y -i public/video/candidates/hero-$id.mp4 -vf 'fps=1,scale=384:216,tile=4x2' -frames:v 1 raw/hero-v2/sheet-$id.jpg
done
