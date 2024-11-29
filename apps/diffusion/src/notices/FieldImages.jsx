import dynamic from "next/dynamic";
import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
const Viewer = dynamic(() => import("react-viewer"), { ssr: false });

function SlideImage({ image: e, onPress }) {
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				flexDirection: "column",
				alignItems: "center",
			}}
		>
			<img src={e.src} alt={e.alt} onClick={onPress} onKeyUp={onPress} />
			{e.footer ? e.footer : <div />}
		</div>
	);
}

export default function FieldImages({ images }) {
	const [selected, setSelected] = useState(-1);
	const [current, setCurrent] = useState(0);
	const sliderRef = useRef(null);

	function renderImages() {
		if (!images.length) {
			return <div />;
		}

		const arr = images.map((e, i) => {
			return (
				<SwiperSlide key={e.src.split("/").pop()}>
					<SlideImage image={e} onPress={() => setSelected(i)} />
				</SwiperSlide>
			);
		});

		return (
			<div>
				{images.length > 1 ? (
					<div
						style={{
							width: "100%",
							textAlign: "end",
							fontSize: "11px",
						}}
					>{`${current + 1}/${images.length}`}</div>
				) : (
					<span />
				)}

				<div
					style={{
						display: "flex",
						alignItems: "center",
						columnGap: 4,
					}}
				>
					<button type="button" className="custom-swiper-prev">
						{"<"}
					</button>
					<Swiper
						ref={sliderRef}
						navigation={{
							nextEl: ".custom-swiper-next",
							prevEl: ".custom-swiper-prev",
						}}
						pagination={{
							type: "fraction",
						}}
						modules={[Navigation]}
						onSlideChange={(sw) => setCurrent(sw.realIndex)}
					>
						{arr}
					</Swiper>
					<button type="button" className="custom-swiper-next">
						{">"}
					</button>
				</div>
			</div>
		);
	}

	function renderModal() {
		if (selected === -1) {
			return <div />;
		}

		return (
			<Viewer
				visible
				onClose={() => {
					document.body.style.overflow = "auto";
					setSelected(-1);
				}}
				images={images}
				activeIndex={selected}
			/>
		);
	}

	return (
		<div className="fieldImages">
			{renderModal()}
			{renderImages()}
			<style jsx global>{`
          .fieldImages {
            width: 100%;
            max-width: 500px;
            margin: auto;
            margin-bottom: 15px;
            padding-left: 15px;
            padding-right: 15px;
          }

          .fieldImages :global(.item) {
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .fieldImages .item p {
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
            text-align: center;
          }
          .fieldImages img {
            background-color: transparent;
            cursor: pointer;
            height: 100%;
            min-height: 200px;
            width: 100%;
            object-fit: contain;
          }

          .slick-next:before,
          .slick-prev:before {
            color: #785d59;
          }

          .swiper-button-prev,
          .swiper-button-next {
            color: #785d59
          }

          .custom-swiper-next,
          .custom-swiper-prev {
            width: 24px;
            height: 24px;
            border: 1px grey solid;
            border-radius: 9999px;
            background: transparent;
            color: #785d59;
            display: flex;
            justify-items: center;
            align-items: center;
            cursor: pointer;
          }

          .swiper-button-disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }
        `}</style>
		</div>
	);
}
