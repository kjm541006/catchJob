package com.project.catchJob.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.catchJob.domain.Member;
import com.project.catchJob.domain.ResponseDTO;
import com.project.catchJob.dto.MemberDTO;
import com.project.catchJob.service.MemberService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping
public class MemberController {

	@Autowired
	private MemberService memberService;
	
	@PostMapping("/register")
	public ResponseEntity<?> registerMember(@RequestBody MemberDTO memberDTO) {
		try {
			if(memberDTO == null || memberDTO.getPwd() == null) {
				throw new RuntimeException("��й�ȣ ����");
			}
			// ��û�� �̿��� ������ ��� �����
			Member member = Member.builder()
					.email(memberDTO.getEmail())
					.pwd(memberDTO.getPwd())
					.name(memberDTO.getName())
					.job(memberDTO.getJob())
					.hasCareer(memberDTO.getHasCareer())
					.build();
			// ���񽺸� �̿��� �������丮�� ��� �����ϱ�
			Member registerMember = memberService.createMember(member);
			MemberDTO responseMemberDTO = MemberDTO.builder()
					.email(registerMember.getEmail())
					.pwd(registerMember.getName())
					.name(registerMember.getName())
					.job(registerMember.getJob())
					.hasCareer(registerMember.getHasCareer())
					.build();
			return ResponseEntity.ok().body(responseMemberDTO);
		} catch (Exception e) {
			// ��� ������ �׻� �ϳ��̹Ƿ� ����Ʈ�� �������ϴ� ResponseDTO�� ������� �ʰ� �׳� member ����
			ResponseDTO responseDTO = ResponseDTO.builder().error(e.getMessage()).build();
			return ResponseEntity.badRequest().body(responseDTO);
		}
	}
	
}
